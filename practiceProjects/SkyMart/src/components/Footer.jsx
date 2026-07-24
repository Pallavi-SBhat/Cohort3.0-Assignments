import React from 'react';
import { Truck, ShieldCheck, Tag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bg-card border-t border-border-color pt-16 pb-8 mt-16">
      <div className="w-full max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8 mb-16">
          <div className="flex items-center gap-6">
            <Truck size={32} className="text-primary-accent" />
            <div>
              <h4 className="text-lg mb-1">Fast Delivery</h4>
              <p className="text-sm text-text-muted">Free shipping on orders over $50</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <ShieldCheck size={32} className="text-primary-accent" />
            <div>
              <h4 className="text-lg mb-1">Secure Payments</h4>
              <p className="text-sm text-text-muted">100% secure payment gateway</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Tag size={32} className="text-primary-accent" />
            <div>
              <h4 className="text-lg mb-1">Best Prices</h4>
              <p className="text-sm text-text-muted">Guaranteed best prices online</p>
            </div>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-border-color text-sm text-text-muted">
          <p>&copy; {new Date().getFullYear()} SkyMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
