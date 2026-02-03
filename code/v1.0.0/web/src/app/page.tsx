/**
 * Homepage for Fudi
 * Main landing page with hero section and feature highlights
 */

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Zap, Shield, Users } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-purple-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-12 w-12 text-purple-600 mr-3" />
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
              Fudi
            </h1>
          </div>
          
          <p className="text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            让AI技术真正融入生活，创造有价值、有温度的智能服务
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/tools">
                开始使用 <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/knowledge">
                了解更多
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 dark:text-white">
          为什么选择 Fudi？
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                <Zap className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">
                快速集成
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              统一的AI工具平台，一键集成多种AI能力，无需在多个平台间切换
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">
                社区驱动
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              活跃的开发者社区，持续贡献工具和最佳实践，共同成长
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">
                安全可靠
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              企业级安全保障，数据加密存储，符合GDPR等国际隐私法规
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                <Sparkles className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">
                智能推荐
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              基于用户偏好和使用场景，智能推荐最适合的AI工具和方案
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            准备好开始你的AI之旅了吗？
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            加入成千上万用户，体验智能、高效、温暖的AI服务
          </p>
          <Button size="lg" variant="outline" className="bg-white text-purple-600 hover:bg-purple-50" asChild>
            <Link href="/assistant">
              立即体验 AI 助手 <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
