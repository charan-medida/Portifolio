namespace backend.Models
{
    public class Form
    {
        public int Id {get; set; }
        public string Name { get; set;} = string.Empty;
        public string Job { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public string LinkedinUrl { get; set; } = string.Empty;
        public string GithubUrl { get; set; } = string.Empty;
        public string About { get; set; } = string.Empty;
        public string Project1h { get; set; } = string.Empty;
        public string Project1 { get; set; } = string.Empty;
        public string Project2h { get; set; } = string.Empty;

        public string Project2 { get; set; } = string.Empty;

        public string Project3h { get; set; } = string.Empty;
        public string Project3 { get; set; } = string.Empty;

        public string Project4h { get; set; } = string.Empty;
        public string Project4 { get; set; } = string.Empty;

        public string Latitude { get; set; } = string.Empty;

        public string Longitude { get; set; } = string.Empty;

        public string ServiceId { get; set; } = string.Empty;

        public string TemplateId { get; set; } = string.Empty;

        public string UserId { get; set; } = string.Empty;

        public string UniqueId { get; set; } = string.Empty;
    }
}