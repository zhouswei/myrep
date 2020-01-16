using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using log4net;
using log4net.Config;
using log4net.Repository;
using Autofac;
using BusinessModule;
using IBusinessModule;
namespace BackgroundFramework.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private ILog log = LogManager.GetLogger(LogManager.GetRepository("NETCoreRepository").Name, typeof (ValuesController));
        
        private static IContainer Container { get; set; }
        public ValuesController()
        {
            
        }
        // GET api/values
        [HttpGet]
        public ActionResult<IEnumerable<string>> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            Container = Startup.ioc_container;
            var service = Container.Resolve<IUserManager>();
            log.Error(service.sum<List<User>>(new User{UserName="zsw", Password="123457"}));
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
