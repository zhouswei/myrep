using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System;
using System.Diagnostics;
using System.Threading.Tasks;
using log4net;
namespace BackgroundFramework
{
    public class CalculateExecutionTimeMiddleware
    {
        private readonly RequestDelegate _next;//下一个中间件
        private readonly ILog _logger;
        Stopwatch stopwatch;
        public CalculateExecutionTimeMiddleware(RequestDelegate next, ILoggerFactory loggerFactory)
        {
            if (next == null)
            {
                throw new ArgumentNullException(nameof(next));
            }
            if (loggerFactory == null)
            {
                throw new ArgumentNullException(nameof(loggerFactory));
            }
            this._next = next;
            _logger = LogManager.GetLogger(LogManager.GetRepository("NETCoreRepository").Name, typeof (CalculateExecutionTimeMiddleware));
            
        }

        public async Task Invoke(HttpContext context)
        {
            stopwatch = new Stopwatch();
            stopwatch.Start();//在下一个中间价处理前，启动计时器
            await _next.Invoke(context);

            stopwatch.Stop();//所有的中间件处理完后，停止秒表。
            _logger.Info($@"TraceId:{context.TraceIdentifier}, RequestMethod:{context.Request.Method}, RequestPath:{context.Request.Path}, ElapsedMilliseconds:{stopwatch.ElapsedMilliseconds}, Response StatusCode: {context.Response.StatusCode}");
        }
    }
}
