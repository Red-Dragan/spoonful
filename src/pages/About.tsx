import React from "react";
import img from "../assets/cooking.jpg";
import styles from "../styles/About.module.css";

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.title}>About Us</h1>
        <p className={styles.intro}>
          Discover culinary inspiration with our carefully curated collection of recipes, 
          designed to make cooking accessible and enjoyable for everyone.
        </p>
      </header>

      {/* Two Column Story Section */}
      <section className={styles.storySection}>
        <div className={styles.storyContainer}>
          <div className={styles.imageSection}>
            <div className={styles.imagePlaceholder}>
              <img src={img} className={styles.imageIcon}/>
            </div>
          </div>
          <div className={styles.textSection}>
            <h2 className={styles.storyTitle}>Our Story</h2>
            <p className={styles.storyText}>
              We believe that great food brings people together. Our platform was created 
              to simplify the cooking experience, offering easy-to-follow recipes that 
              inspire creativity in the kitchen.
            </p>
            <p className={styles.storyText}>
              From quick weeknight dinners to elaborate weekend feasts, we provide the 
              tools and inspiration needed to create memorable meals with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.featuresTitle}>Why Choose Us</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>Easy Recipes</h3>
            <p className={styles.featureText}>
              Simple, step-by-step instructions that anyone can follow
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🥗</div>
            <h3 className={styles.featureTitle}>Healthy Choices</h3>
            <p className={styles.featureText}>
              Nutritious recipes that support your wellness goals
            </p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🔍</div>
            <h3 className={styles.featureTitle}>Quick Search</h3>
            <p className={styles.featureText}>
              Find the perfect recipe instantly with our smart search
            </p>
          </div>
        </div>
      </section>

      {/* Closing Quote Section */}
      <section className={styles.closingSection}>
        <blockquote className={styles.quote}>
          "Cooking is not about convenience. It's about love, creativity, and sharing moments that matter."
        </blockquote>
        <p className={styles.quoteAuthor}>— The Recipe Collection Team</p>
      </section>
    </div>
  );
};

export default About;
