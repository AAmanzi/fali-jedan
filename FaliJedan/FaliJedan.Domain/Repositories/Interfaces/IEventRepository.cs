﻿using FaliJedan.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Domain.Repositories.Interfaces
{
    public interface IEventRepository
    {
        List<EventHostDTO> GetAvailableEvents();

        Guid? AddEvent(Event eventToAdd, Guid userId);

        bool DeleteEventById(Guid id);

        Event GetEventById(Guid id);

        List<EventHostDTO> GetFilteredEvents(EventFilterDTO filters);

        Event GetUnreviewedEventByUserId(Guid userId);

        List<Event> GetEventsByUserId(Guid userId);
    }
}
