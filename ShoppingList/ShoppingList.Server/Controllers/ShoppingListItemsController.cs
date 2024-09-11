using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingList.Server.Data;
using ShoppingList.Server.Models;

namespace ShoppingList.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ShoppingListItemsController : ControllerBase
{
    private readonly ShoppingListDataContext _context;

    public ShoppingListItemsController(ShoppingListDataContext context)
    {
        _context = context;
    }

    // GET: api/ShoppingListItems
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShoppingListItem>>> Get()
    {
        return await _context.ShoppingListItems.ToListAsync();
    }

    // GET: api/ShoppingListItems/5
    [HttpGet("{id}")]
    public async Task<ActionResult<ShoppingListItem>> Get(Guid id)
    {
        var shoppingListItem = await _context.ShoppingListItems.FindAsync(id);

        if (shoppingListItem == null)
        {
            return NotFound();
        }

        return shoppingListItem;
    }

    // PUT: api/ShoppingListItems/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateShoppingListItem request)
    {
        var shoppingListItem = new ShoppingListItem
        {
            Id = id,
            Name = request.Name,
            IsPickedUp = request.IsPickedUp,
        };

        _context.Entry(shoppingListItem).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ShoppingListItemExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // POST: api/ShoppingListItems
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<ShoppingListItem>> Create(CreateShoppingListItem request)
    {
        var shoppingListItem = new ShoppingListItem
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            IsPickedUp = false,
        };

        _context.ShoppingListItems.Add(shoppingListItem);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(Get), new { id = shoppingListItem.Id }, shoppingListItem);
    }

    // DELETE: api/ShoppingListItems/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var shoppingListItem = await _context.ShoppingListItems.FindAsync(id);
        if (shoppingListItem == null)
        {
            return NotFound();
        }

        _context.ShoppingListItems.Remove(shoppingListItem);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ShoppingListItemExists(Guid id)
    {
        return _context.ShoppingListItems.Any(e => e.Id == id);
    }
}
