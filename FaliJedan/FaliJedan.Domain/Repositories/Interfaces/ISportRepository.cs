using FaliJedan.Data.Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Domain.Repositories.Interfaces
{
    public interface ISportRepository
    {
        List<Sport> GetAllSports();
    }
}
