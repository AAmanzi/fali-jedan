﻿using FaliJedan.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Domain.Repositories.Interfaces
{
    public interface IEventUserRepository
    {
        bool AddEventUser(Guid eventGuid, Guid userId);

        bool DeleteEventUser(EventUser eventUser);

        bool ConfirmEventUser(EventUser eventUser);

        bool ReviewEventUser(ReviewDTO review);

        List<EventUser> GetUnconfirmedEventUsers(Guid userId);
    }
}
