﻿using Femalab.Model.Entities;

namespace Femalab.Service.MasterService
{
    public interface IProductService : IEntityService<Product>
    {
        Product GetById(long Id);   
    }
}