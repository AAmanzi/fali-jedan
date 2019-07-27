using FaliJedan.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Domain.Repositories.Interfaces
{
    public interface IEventRepository
    {
        List<Event> GetAllEvents();

        bool AddEvent(Event eventToAdd);

        bool DeleteEventById(Guid id);

        Event GetEventById(Guid id);

        List<Event> GetFilteredEvents(EventFilterDTO filters);
    }
}
