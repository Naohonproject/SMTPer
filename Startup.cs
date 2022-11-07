using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

namespace SMTPer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }
        readonly string SpecificAllowedOrigins = "SpecificAllowedOrigins";

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            services.AddCors(options =>
            {
                options.AddPolicy(
                    name: SpecificAllowedOrigins,
                    policy =>
                    {
                        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                    }
                );
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseCors(SpecificAllowedOrigins);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapPost(
                    "/sendEmail/",
                    async context =>
                    {
                        MailResponse mailResponse;
                        string body = "";
                        string jsonMailResponse;
                        using (StreamReader stream = new StreamReader(context.Request.Body))
                        {
                            body = await stream.ReadToEndAsync();
                        }
                        if (body == "")
                        {
                            mailResponse = new MailResponse(
                                "Email Configuration is required",
                                "fail"
                            );
                            jsonMailResponse = JsonConvert.SerializeObject(mailResponse);
                            await context.Response.WriteAsync(jsonMailResponse);
                        }
                        MailSettings mail = JsonConvert.DeserializeObject<MailSettings>(body);

                        MailResponse message = await MailUtils.MailUtils.SendSmtpMail(
                            mail.From,
                            mail.To,
                            "test gui mail tu Letuanbao",
                            "xin chao Le tuan bao",
                            mail.Email,
                            mail.Password,
                            mail.Host,
                            (int)mail.Port,
                            mail.IsSecurity
                        );

                        jsonMailResponse = JsonConvert.SerializeObject(message);
                        await context.Response.WriteAsync(jsonMailResponse);
                    }
                );
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
