<script lang="ts" setup>
import { ref } from "vue";

const year = ref(new Date().getFullYear());
</script>

<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1>Grow Your Artistic Journey with <span class="highlight">Copal</span></h1>
          <p class="subtitle">A supportive community for newbie artists to receive motivational feedback and track their progress</p>
          <div class="cta-buttons">
            <button class="btn primary">Get Started</button>
            <button class="btn secondary">Learn More</button>
          </div>
        </div>
        <div class="hero-image">
          <!-- <img src="@/assets/hero-image.svg" alt="Artist drawing with feedback" /> -->
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features">
      <div class="container">
        <h2>Why Choose Copal?</h2>
        <div class="feature-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-comments"></i>
            </div>
            <h3>Supportive Feedback</h3>
            <p>Receive constructive and motivational feedback from our community and AI-powered tools</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>Track Your Progress</h3>
            <p>Visualize your artistic journey with progress tracking and milestone celebrations</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-users"></i>
            </div>
            <h3>Supportive Community</h3>
            <p>Connect with fellow artists who understand the challenges of learning</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-lightbulb"></i>
            </div>
            <h3>Personalized Guidance</h3>
            <p>Get tailored suggestions to improve your specific artistic style and goals</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section -->
    <section class="how-it-works">
      <div class="container">
        <h2>How Copal Works</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Upload Your Art</h3>
            <p>Share your latest creations with the Copal community</p>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>Receive Feedback</h3>
            <p>Get constructive comments from both AI and community members</p>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Improve & Track</h3>
            <p>Apply the feedback and watch your progress over time</p>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <h3>Celebrate Growth</h3>
            <p>Celebrate milestones and see how far you've come</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials">
      <div class="container">
        <h2>What Our Artists Say</h2>
        <div class="testimonial-slider">
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"Copal has transformed my artistic journey. The supportive feedback helped me improve faster than I ever thought possible!"</p>
            </div>
            <!-- <div class="testimonial-author">
              <img src="@/assets/testimonial-1.jpg" alt="Testimonial author" />
              <div>
                <h4>Sarah J.</h4>
                <p>Digital Artist, 8 months with Copal</p>
              </div>
            </div> -->
          </div>
          <div class="testimonial">
            <div class="testimonial-content">
              <p>"As a beginner, I was afraid of sharing my art. The Copal community made me feel welcome and gave me the confidence to keep going."</p>
            </div>
            <!-- <div class="testimonial-author">
              <img src="@/assets/testimonial-2.jpg" alt="Testimonial author" />
              <div>
                <h4>Miguel R.</h4>
                <p>Traditional Painter, 1 year with Copal</p>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container">
        <h2>Ready to Start Your Artistic Journey?</h2>
        <p>Join thousands of artists who are growing and improving together</p>
        <button class="btn primary large">Sign Up Now - It's Free!</button>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="container">
        <div class="footer-content">
          <div class="footer-logo">
            <h3>Copal</h3>
            <p>Supporting artists at every step</p>
          </div>
          <div class="footer-links">
            <div class="link-group">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">FAQ</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
              </ul>
            </div>
            <div class="link-group">
              <h4>Resources</h4>
              <ul>
                <li><a href="#">Community</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; {{ year }} Copal. All rights reserved.</p>
          <!-- <div class="social-links">
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-facebook"></i></a>
          </div> -->
        </div>
      </div>
    </footer>
  </div>
</template>





<style scoped>
/* Base Styles */
:root {
  --primary-color: #6c63ff;
  --secondary-color: #f5f5f5;
  --accent-color: #ff6b6b;
  --text-color: #333;
  --light-text: #777;
  --white: #ffffff;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --border-radius: 8px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.landing-page {
  font-family: 'Poppins', sans-serif;
  color: var(--text-color);
  line-height: 1.6;
}

h1, h2, h3, h4 {
  margin-top: 0;
  line-height: 1.2;
}

h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
}

.highlight {
  color: var(--primary-color);
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
}

.btn.primary {
  background-color: var(--primary-color);
  color: var(--white);
}

.btn.primary:hover {
  background-color: #5a52e0;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}

.btn.secondary {
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
}

.btn.secondary:hover {
  background-color: rgba(108, 99, 255, 0.1);
}

.btn.large {
  padding: 16px 32px;
  font-size: 1.1rem;
}

/* Hero Section */
.hero {
  padding: 100px 0;
  background-color: #f9f9ff;
  overflow: hidden;
}

.hero .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero-content {
  flex: 1;
  max-width: 600px;
}

.subtitle {
  font-size: 1.2rem;
  color: var(--light-text);
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.hero-image {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
}

/* Features Section */
.features {
  padding: 100px 0;
  background-color: var(--white);
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  background-color: var(--white);
  border-radius: var(--border-radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  transition: transform 0.3s ease;
  text-align: center;
}

.feature-card:hover {
  transform: translateY(-10px);
}

.feature-icon {
  width: 70px;
  height: 70px;
  background-color: rgba(108, 99, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.feature-icon i {
  font-size: 1.8rem;
  color: var(--primary-color);
}

.feature-card h3 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

/* How It Works Section */
.how-it-works {
  padding: 100px 0;
  background-color: #f9f9ff;
}

.steps {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
}

.step {
  flex: 1;
  min-width: 200px;
  text-align: center;
  position: relative;
}

.step-number {
  width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 1.5rem;
  font-weight: bold;
}

/* Testimonials Section */
.testimonials {
  padding: 100px 0;
  background-color: var(--white);
}

.testimonial-slider {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding: 1rem 0;
  scrollbar-width: none;
}

.testimonial-slider::-webkit-scrollbar {
  display: none;
}

.testimonial {
  flex: 0 0 calc(50% - 1rem);
  background-color: var(--white);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
  padding: 2rem;
}

.testimonial-content {
  margin-bottom: 1.5rem;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.testimonial-author img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.testimonial-author h4 {
  margin: 0;
  font-size: 1.1rem;
}

.testimonial-author p {
  margin: 0;
  color: var(--light-text);
  font-size: 0.9rem;
}

/* CTA Section */
.cta {
  padding: 80px 0;
  background-color: var(--primary-color);
  color: var(--white);
  text-align: center;
}

.cta h2 {
  color: var(--white);
  margin-bottom: 1rem;
}

.cta p {
  margin-bottom: 2rem;
  font-size: 1.2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta .btn.primary {
  background-color: var(--white);
  color: var(--primary-color);
}

.cta .btn.primary:hover {
  background-color: #f0f0f0;
}

/* Footer */
footer {
  background-color: #2d2b55;
  color: var(--white);
  padding: 80px 0 20px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 3rem;
}

.footer-logo {
  flex: 1;
  min-width: 200px;
  margin-bottom: 2rem;
}

.footer-logo h3 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 3rem;
}

.link-group h4 {
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.link-group ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.link-group li {
  margin-bottom: 0.8rem;
}

.link-group a {
  color: #b8b5ff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.link-group a:hover {
  color: var(--white);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-links a {
  color: var(--white);
  font-size: 1.2rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: var(--accent-color);
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero .container {
    flex-direction: column;
    text-align: center;
  }
  
  .hero-content {
    margin-bottom: 3rem;
  }
  
  .cta-buttons {
    justify-content: center;
  }
  
  .hero-image {
    justify-content: center;
  }
  
  .steps {
    flex-direction: column;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .testimonial {
    flex: 0 0 100%;
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  .feature-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
  
  .footer-content {
    flex-direction: column;
  }
  
  .footer-links {
    flex-direction: column;
    gap: 2rem;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
}
</style>