using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Objects
{
    public class DataResponse
    {
            public bool IsSuccess { get; set; }
            public object Data { get; set; }
            public List<string> Errors { get; set; }
        
    }
}
