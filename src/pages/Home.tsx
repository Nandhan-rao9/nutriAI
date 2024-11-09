import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, Camera, MessageSquare, Apple } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const FeatureCard = ({ children, to, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link
        to={to}
        className="block p-6 bg-gray-800/50 rounded-xl hover:bg-gray-800/70 transform hover:scale-105 transition-all duration-300 border border-gray-700 backdrop-blur-sm"
      >
        {children}
      </Link>
    </motion.div>
  );
};

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl"
          >
            <span className="block">Your Personal</span>
            <span className="block bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              AI Nutrition Assistant
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
          >
            Get personalized nutrition advice, analyze your meals, and chat with our AI expert to achieve your health goals.
          </motion.p>
        </motion.div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard to="/nutrition-plan" delay={0.2}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Brain className="h-12 w-12 text-emerald-400 mb-4" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl font-medium text-white"
              >
                AI Nutrition Plan
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="mt-2 text-gray-300"
              >
                Get a personalized nutrition plan based on your goals and preferences
              </motion.p>
            </FeatureCard>

            <FeatureCard to="/food-analysis" delay={0.4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Camera className="h-12 w-12 text-emerald-400 mb-4" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="text-xl font-medium text-white"
              >
                Food Analysis
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-2 text-gray-300"
              >
                Upload food photos for instant nutritional information
              </motion.p>
            </FeatureCard>

            <FeatureCard to="/chat" delay={0.6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <MessageSquare className="h-12 w-12 text-emerald-400 mb-4" />
              </motion.div>
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-xl font-medium text-white"
              >
                Expert Chat
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-2 text-gray-300"
              >
                Chat with our AI nutritionist for personalized advice
              </motion.p>
            </FeatureCard>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gray-800/50 rounded-2xl shadow-xl p-8 border border-gray-700 backdrop-blur-sm"
        >
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 1 }}
            >
              <Apple className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="text-3xl font-bold text-white"
            >
              Why Choose NutriAI?
            </motion.h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-lg bg-gray-700/50"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-lg font-semibold text-emerald-400"
                >
                  Personalized
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  className="mt-2 text-gray-300"
                >
                  Tailored nutrition advice based on your unique needs
                </motion.p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-lg bg-gray-700/50"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="text-lg font-semibold text-emerald-400"
                >
                  AI-Powered
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  className="mt-2 text-gray-300"
                >
                  Advanced AI technology for accurate recommendations
                </motion.p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="p-4 rounded-lg bg-gray-700/50"
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  className="text-lg font-semibold text-emerald-400"
                >
                  Easy to Use
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="mt-2 text-gray-300"
                >
                  Simple interface for tracking your nutrition journey
                </motion.p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};