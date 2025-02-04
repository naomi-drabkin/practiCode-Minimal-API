using Microsoft.EntityFrameworkCore;
using TodoApi;
var builder = WebApplication.CreateBuilder(args);

// הגדרת חיבור למסד נתונים
builder.Services.AddDbContext<ToDoDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("ToDoDB"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("ToDoDB"))));

// הגדרת CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// הוסף את Swagger לפני יצירת ה-build של האפליקציה
builder.Services.AddSwaggerGen();  // הוספת Swagger
builder.Services.AddEndpointsApiExplorer(); // יוצר את ה-EndPoints עבור Swagger

var app = builder.Build();

// קביעת אם אנחנו בסביבת פיתוח
app.UseCors("AllowSpecificOrigin");

// if (app.Environment.IsDevelopment())
// {
    app.UseSwagger();  // מפעיל את Swagger
    app.UseSwaggerUI();  // מפעיל את UI של Swagger
// }


app.MapGet("/", () => "Hello World!");


app.MapGet("/api/items", async (ToDoDbContext dbContext) =>
{
    var items = await dbContext.Items.ToListAsync();
    return Results.Ok(items);
});

app.MapPost("/api/items", async (ToDoDbContext dbContext, Item newItem) =>
{
    dbContext.Items.Add(newItem);
    await dbContext.SaveChangesAsync();

    return Results.Created($"/api/tasks/{newItem.Id}", newItem);
});

app.MapPut("/api/items/{id}", async (ToDoDbContext dbContext, int id, bool IsComplete) =>
{

    var existingItem = await dbContext.Items.FindAsync(id);

    if (existingItem == null)
    {
        return Results.NotFound();
    }

    existingItem.IsComplete = IsComplete;
    await dbContext.SaveChangesAsync();

    return Results.Ok(existingItem);

});

app.MapDelete("/api/items/{id}", async (ToDoDbContext dbContext, int id) =>
{

    var existingItem = await dbContext.Items.FindAsync(id);
    if (existingItem == null)
    {
        return Results.NotFound();
    }
    dbContext.Items.Remove(existingItem);
    await dbContext.SaveChangesAsync();
    return Results.Ok(existingItem + " deleted");

});

app.Run();
