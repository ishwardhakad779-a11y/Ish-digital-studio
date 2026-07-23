import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Loader2 } from 'lucide-react';

import SectionHeading from '../ui/SectionHeading';
import { pricing } from '../../data/siteData';
import { createPaymentOrder, verifyPayment } from '../../utils/api';

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}

export default function Pricing() {
  const [loadingPlan, setLoadingPlan] = useState(null);

  const handlePayment = async (plan) => {
    setLoadingPlan(plan.name);

    try {
      const scriptLoaded = await loadRazorpayScript();

      if (!scriptLoaded) {
        alert('Payment gateway failed to load. Check your internet connection.');
        setLoadingPlan(null);
        return;
      }

      const amount = parseInt(
        plan.price.replace(/[^0-9]/g, ''),
        10
      );

      const order = await createPaymentOrder({
        amount,
        plan_name: plan.name,
      });

      const options = {
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        name: 'ISH Digital Studio',
        description: `${plan.name} Plan`,
        order_id: order.order_id,

        handler: async function (response) {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            alert('Payment successful! We will contact you shortly.');
          } catch (err) {
            alert('Payment verification failed. Please contact support.');
          }
        },

        theme: {
          color: '#00E5FF',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      alert(
        'Something went wrong. Please try again or contact us on WhatsApp.'
      );
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section id="pricing" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">

        <SectionHeading
          eyebrow="Pricing"
          title="Plans built to scale with you."
          desc="Transparent pricing. No hidden costs. Custom quotes for larger builds."
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {pricing.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.5,
                delay: i * 0.1,
              }}
              className={`relative p-8 rounded-2xl ${
                plan.highlighted
                  ? 'bg-gradient-to-b from-[#0F172A] to-[#0F172A] border-2 border-[#00E5FF] glow-primary'
                  : 'glass-card'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617] text-xs font-semibold">
                  Most Popular
                </span>
              )}

              <h3 className="font-heading font-semibold text-xl">
                {plan.name}
              </h3>

              <p className="text-white/50 text-sm mt-2 mb-6">
                {plan.desc}
              </p>

              <div className="font-display font-bold text-4xl mb-6">
                {plan.price}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-white/70"
                  >
                    <Check
                      size={16}
                      className="text-[#00E5FF] shrink-0"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handlePayment(plan)}
                disabled={loadingPlan === plan.name}
                data-cursor-hover
                className={`w-full flex items-center justify-center gap-2 text-center py-3 rounded-full text-sm font-medium transition-all disabled:opacity-60 ${
                  plan.highlighted
                    ? 'bg-gradient-to-r from-[#00E5FF] to-[#8B5CF6] text-[#020617]'
                    : 'glass-card hover:border-[#00E5FF]/50'
                }`}
              >
                {loadingPlan === plan.name ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Processing...
                  </>
                ) : (
                  'Get Started'
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}