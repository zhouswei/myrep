using System;
using log4net;
using log4net.Config;
using log4net.Repository;
using IBusinessModule;
namespace BusinessModule
{
    public class UserManager: IUserManager
    {
        demoContext _context;
        private ILog log = LogManager.GetLogger(LogManager.GetRepository("NETCoreRepository").Name, typeof (UserManager));
        public UserManager(demoContext context)
        {
            _context =context;
        }
        public string sum<T>(Object obj)
        {
            _context.User.Add((User)obj);
            _context.SaveChanges();
            log.Error("545545");
            return "123";
        }
    }
}
