<template>
  <ProtectedLayout>
    <div class="container mx-auto px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">About PlanDraw</h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Empowering creators, designers, and planners with intuitive tools to bring their ideas to life.
          </p>
        </div>

        <!-- Mission Section -->
        <Card class="p-8 mb-8">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p class="text-gray-600 leading-relaxed">
            At PlanDraw, we believe that great ideas shouldn't be limited by complex tools. 
            Our mission is to provide an intuitive, powerful platform that makes design and 
            planning accessible to everyone, regardless of their technical expertise.
          </p>
        </Card>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 gap-8 mb-8">
          <Card class="p-6">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p class="text-gray-600">
              Built with modern web technologies for smooth, responsive performance 
              that keeps up with your creative flow.
            </p>
          </Card>

          <Card class="p-6">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Collaborative</h3>
            <p class="text-gray-600">
              Work together with your team in real-time, share ideas instantly, 
              and bring collective creativity to your projects.
            </p>
          </Card>

          <Card class="p-6">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Customizable</h3>
            <p class="text-gray-600">
              Adapt the platform to your workflow with customizable tools, 
              templates, and settings that match your unique style.
            </p>
          </Card>

          <Card class="p-6">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
            <p class="text-gray-600">
              Your creative work is protected with enterprise-grade security, 
              ensuring your projects and data remain safe and private.
            </p>
          </Card>
        </div>

        <!-- Team Section -->
        <Card class="p-8 text-center">
          <h2 class="text-2xl font-semibold text-gray-900 mb-4">Built by Creators, for Creators</h2>
          <p class="text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Our team combines years of experience in design, development, and user experience 
            to create tools that truly understand the creative process. We're not just building 
            software—we're crafting the future of digital creativity.
          </p>
          <div class="mt-6">
            <Button>Meet the Team</Button>
          </div>
        </Card>
      </div>
    </div>
  </ProtectedLayout>
</template>

<script setup lang="ts">
import ProtectedLayout from '../../layouts/ProtectedLayout.vue'
import { Card } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
</script>