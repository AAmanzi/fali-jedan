using FaliJedan.Data.Entities;
using FaliJedan.Data.Entities.Models;
using FaliJedan.Domain.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Domain.Repositories.Implementations
{
    public class SportRepository : ISportRepository
    {
        public SportRepository(FaliJedanContext context)
        {
            _context = context;
        }

        private FaliJedanContext _context { get; set; }

        public List<Sport> GetAllSports()
        {
            return _context.Sports.ToList();
        }
    }
}
