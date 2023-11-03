using Microsoft.AspNetCore.Cors.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("CorsPolicy", policyBuilder => policyBuilder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());
});

builder.Services.AddCors();
// Add services to the container.

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();

app.UseCors();

app.UseStaticFiles(new StaticFileOptions
{
    ServeUnknownFileTypes = true,
    OnPrepareResponse = (ctx) =>
    {
        var policy = app.Services.GetService<ICorsPolicyProvider>().GetPolicyAsync(ctx.Context, "CorsPolicy")
            .ConfigureAwait(false)
        .GetAwaiter().GetResult();

        var corsResult = app.Services.GetService<ICorsService>().EvaluatePolicy(ctx.Context, policy);

        app.Services.GetService<ICorsService>().ApplyResult(corsResult, ctx.Context.Response);
    }
});

app.Run();