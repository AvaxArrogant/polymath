import { useState } from 'react';
import NeuralNetworkBackground from './components/NeuralNetworkBackground';
import HeroSection from './components/HeroSection';
import NeuralPortInput from './components/NeuralPortInput';
import SocialProofTicker from './components/SocialProofTicker';
import CustomCursor from './components/CustomCursor';

function App() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-void-black text-white grain relative">
      <CustomCursor />
      <NeuralNetworkBackground isSubmitting={isSubmitting} />

      <main className="relative z-10">
        <HeroSection />

        <section className="relative px-4 py-20 pb-32">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                Join the <span className="text-neon-green">Neural Revolution</span>
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Early access is limited. Input your neural credentials to secure your position in the next generation of education.
              </p>
            </div>

            <NeuralPortInput
              onSubmitStart={() => setIsSubmitting(true)}
              onSubmitComplete={() => setIsSubmitting(false)}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 max-w-3xl mx-auto">
              <div className="p-6 rounded-lg border border-neon-green/20 bg-neon-green/5 backdrop-blur-sm">
                <div className="text-4xl font-bold text-neon-green mb-2">98%</div>
                <div className="text-white/70 text-sm">Job Placement Rate</div>
              </div>
              <div className="p-6 rounded-lg border border-electric-indigo/20 bg-electric-indigo/5 backdrop-blur-sm">
                <div className="text-4xl font-bold text-electric-indigo mb-2">4.2x</div>
                <div className="text-white/70 text-sm">Faster Than Traditional</div>
              </div>
              <div className="p-6 rounded-lg border border-neon-green/20 bg-neon-green/5 backdrop-blur-sm">
                <div className="text-4xl font-bold text-neon-green mb-2">$127k</div>
                <div className="text-white/70 text-sm">Average Starting Salary</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SocialProofTicker />
    </div>
  );
}

export default App;
