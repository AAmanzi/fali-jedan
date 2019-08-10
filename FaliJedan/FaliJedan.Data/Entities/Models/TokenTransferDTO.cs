using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FaliJedan.Data.Entities.Models
{
    public class TokenTransferDTO
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
