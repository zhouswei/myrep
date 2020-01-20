using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Autofac;
using Autofac.Extensions.DependencyInjection;
using System.Reflection;
using log4net;
using log4net.Config;
using log4net.Repository;
using IBusinessModule;
using BusinessModule;
namespace BackgroundFramework
{
    public class Startup
    {
        public static IContainer ioc_container;
        public static  ILoggerRepository  Repository;
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            Repository = LogManager.CreateRepository ("NETCoreRepository");
            XmlConfigurator.Configure(Repository, new FileInfo ("log4net.config"));
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            // services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            return RegisterAutofac(services);
        }

        public IServiceProvider RegisterAutofac(IServiceCollection services)
        {
            services.Configure<CookiePolicyOptions>(options => {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new Swashbuckle.AspNetCore.Swagger.Info
                {
                    Version = "v1",
                    Title = "DotNet Core WebAPI文档"
                });

            });
            var builder = new ContainerBuilder();
            var d=Assembly.GetExecutingAssembly();
            Assembly entityAss = Assembly.Load("BusinessModule"); //对Entity这个类库进行里的类进行集体注册
            Type[] etypes = entityAss.GetTypes();
            builder.RegisterTypes(etypes).AsImplementedInterfaces().PropertiesAutowired();
            builder.Register(m=>new DbContextFactory().CreateDbContext(null)).As<demoContext>();
            // builder.RegisterType<User>().As<IUser>();
                       
            Assembly webAss = Assembly.Load("BackgroundFramework");//对当前项目中的类进行注册
            Type[] wtypes = webAss.GetTypes();
            builder.RegisterTypes(wtypes).AsImplementedInterfaces().PropertiesAutowired();
            builder.Populate(services);
            ioc_container = builder.Build();
            return new AutofacServiceProvider(ioc_container);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCalculateExecutionTime();
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "DotNet Core WebAPI文档");
                });
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            
            app.UseHttpsRedirection();
            app.UseMvc();
        }
    }
}
