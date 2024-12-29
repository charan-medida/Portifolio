using backend.Models;

namespace backend.Services
{
    public class RegistrationService
    {
        private readonly AppDbContext _context;
        public RegistrationService(AppDbContext context)
        {
            _context = context;
        }
        public string RegisterUser(Form form)
        {
            string uniqueId = GenerateUniqueId();
            form.UniqueId = uniqueId;

            
            _context.profiledata.Add(form);
            _context.SaveChanges();

            return uniqueId;
        }

        private string GenerateUniqueId()
        {
            // Generate a 6-digit random number
            Random random = new Random();
            return random.Next(100000, 999999).ToString();
        }

        public Form? GetUserById(String UniqueId)
        {
            Console.WriteLine($"Received UniqueId: {UniqueId}");
            return _context.profiledata.FirstOrDefault(u => u.UniqueId == UniqueId);
        }
    }
}
