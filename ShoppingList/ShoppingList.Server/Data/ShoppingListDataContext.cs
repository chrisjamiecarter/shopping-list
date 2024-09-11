using Microsoft.EntityFrameworkCore;
using ShoppingList.Server.Models;

namespace ShoppingList.Server.Data;

public class ShoppingListDataContext : DbContext
{
    public ShoppingListDataContext (DbContextOptions<ShoppingListDataContext> options)
        : base(options)
    {
    }

    public DbSet<ShoppingListItem> ShoppingListItems { get; set; } = default!;
}
