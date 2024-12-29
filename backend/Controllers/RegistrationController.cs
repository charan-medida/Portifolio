using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;

[ApiController]
[Route("registration")]
public class RegistrationController : ControllerBase
{
    private readonly RegistrationService _registrationService;

    public RegistrationController(RegistrationService registrationService)
    {
        _registrationService = registrationService;
    }

    [HttpPost("register")]
    public IActionResult CreateUser([FromBody] Form form)
    {
        var contentType = Request.ContentType;
        if (form == null) return BadRequest("Invalid input data.");
        var result = _registrationService.RegisterUser(form);
        return Ok(result);
    }

    [HttpGet("get-user")]
    public IActionResult GetUser([FromQuery] String UniqueId)
    {
        if (string.IsNullOrWhiteSpace(UniqueId))
        {
            return BadRequest("UniqueId cannot be null or empty.");
        }

        var user = _registrationService.GetUserById(UniqueId);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        return Ok(user);
    }

}
