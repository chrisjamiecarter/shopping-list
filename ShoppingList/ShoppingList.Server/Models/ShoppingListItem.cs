using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ShoppingList.Server.Models;

public class ShoppingListItem
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string? Name { get; set; }

    public bool IsPickedUp { get; set; }
}
