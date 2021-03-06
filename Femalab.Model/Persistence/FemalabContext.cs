﻿using Femalab.Model.Audit;
using Femalab.Model.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Femalab.Model.Persistence
{
    public class FemalabContext : DbContext
    {
        public FemalabContext() : base("Name=FemalabContext")
        {

        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Attention> Attentions { get; set; }
        public DbSet<AttentionDetails> AttentionDetails { get; set; }
        public DbSet<AttentionCategory> AttentionCategory { get; set; }
        public DbSet<AttentionType> AttentionType { get; set; }
        public DbSet<Doctor> Doctor { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<Specialty> Specialty { get; set; }
        public DbSet<Product> Product { get; set; }

        public DbSet<Invoice> Invoice { get; set; }
        public DbSet<InvoiceDetails> InvoiceDetails { get; set; }
        public DbSet<Payment> Payment { get; set; }
        public DbSet<Customer> Customer { get; set; }
        public DbSet<Ubigeo> Ubigeo { get; set; }


        public override int SaveChanges()
        {
            var modifiedEntries = ChangeTracker.Entries()
                                    .Where(x => x.Entity is IAuditableEntity
                                    && x.State == EntityState.Added || x.State == EntityState.Modified);

            foreach (var entry in modifiedEntries)
            {
                IAuditableEntity entity = entry.Entity as IAuditableEntity;
                if (entity != null)
                {
                    string identityName = Thread.CurrentPrincipal.Identity.Name;
                    DateTime now = DateTime.Now;

                    if (entry.State == System.Data.Entity.EntityState.Added)
                    {
                        entity.CreatedBy = identityName;
                        entity.CreatedDate = now;
                    }
                    else
                    {
                        base.Entry(entity).Property(x => x.CreatedBy).IsModified = false;
                        base.Entry(entity).Property(x => x.CreatedDate).IsModified = false;
                    }

                    entity.UpdatedBy = identityName;
                    entity.UpdatedDate = now;
                }
            }
            return base.SaveChanges();
        }

    }
}
