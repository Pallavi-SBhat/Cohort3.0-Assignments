import React from 'react';
import { Target, Users, Zap } from 'lucide-react';

const About = () => {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 py-16 animate-fade-in">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-text-main to-primary-accent bg-clip-text text-transparent inline-block">
          About SkyMart
        </h1>
        <p className="text-xl text-text-muted">Redefining the online shopping experience.</p>
      </section>

      <section className="max-w-[800px] mx-auto mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-text-muted text-lg leading-relaxed">
            Founded with a passion for bringing the best products to customers worldwide, SkyMart 
            has grown from a small startup to a premier e-commerce destination. We believe that 
            shopping should be an experience, not just a transaction. Our team works tirelessly 
            to curate high-quality products across various categories, ensuring that every item 
            meets our strict standards for quality and value.
          </p>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-bold mb-12">Our Core Values</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
          <div className="card text-center py-10 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-accent/10 text-primary-accent rounded-full mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Quality First</h3>
            <p className="text-text-muted">We source only the best products to ensure lasting satisfaction for our customers.</p>
          </div>
          <div className="card text-center py-10 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-accent/10 text-primary-accent rounded-full mb-6">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Customer Centric</h3>
            <p className="text-text-muted">Your experience is our top priority. We're here to support you at every step.</p>
          </div>
          <div className="card text-center py-10 px-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-accent/10 text-primary-accent rounded-full mb-6">
              <Zap size={32} />
            </div>
            <h3 className="text-xl font-bold mb-4">Fast & Reliable</h3>
            <p className="text-text-muted">We pride ourselves on swift deliveries and reliable service you can count on.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
