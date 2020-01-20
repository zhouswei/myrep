using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
namespace BackgroundFramework
{
    
public static class CalculateExecutionTimeMiddlewareExtensions
    {
        public static IApplicationBuilder UseCalculateExecutionTime(this IApplicationBuilder app)
        {
            if (app == null)
            {
                throw new ArgumentNullException(nameof(app));
            }
            return app.UseMiddleware<CalculateExecutionTimeMiddleware>(); 
        }
    }
}