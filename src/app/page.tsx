"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Firebase CRUD Operations: Three Different Approaches
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Method 1 Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Method 1: Server-Side Only</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-400">1</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Manual refresh required to see changes</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-400">2</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Data is always in sync with server</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-blue-600 dark:text-blue-400">3</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Simple implementation</p>
              </div>
            </div>
            <Link 
              href="/technique1"
              className="mt-6 block w-full text-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Method 1
            </Link>
          </div>

          {/* Method 2 Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Method 2: Optimistic Updates</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 dark:text-green-400">1</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Instant UI updates</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 dark:text-green-400">2</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Rollback on failure</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-green-600 dark:text-green-400">3</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Better user experience</p>
              </div>
            </div>
            <Link 
              href="/technique2"
              className="mt-6 block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Try Method 2
            </Link>
          </div>

          {/* Method 3 Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 dark:text-purple-400">Method 3: Real-time Updates</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 dark:text-purple-400">1</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Live data synchronization</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 dark:text-purple-400">2</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Automatic updates</p>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-3">
                  <span className="text-purple-600 dark:text-purple-400">3</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">Best for real-time apps</p>
              </div>
            </div>
            <Link 
              href="/technique3"
              className="mt-6 block w-full text-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Try Method 3
            </Link>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Key Differences</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Server-Side Only</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Manual refresh needed</li>
                <li>• Always shows server state</li>
                <li>• Good for simple apps</li>
                <li>• Lower complexity</li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Optimistic Updates</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Instant UI feedback</li>
                <li>• Handles errors gracefully</li>
                <li>• Better UX</li>
                <li>• Medium complexity</li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Real-time Updates</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Live synchronization</li>
                <li>• No manual refresh</li>
                <li>• Best for real-time apps</li>
                <li>• Higher complexity</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Use Cases Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">When to Use Each Method</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Server-Side Only</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Simple CRUD applications</li>
                <li>• When data consistency is critical</li>
                <li>• Low-traffic applications</li>
                <li>• When real-time updates aren&apos;t needed</li>
              </ul>
            </div>

            <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-green-600 dark:text-green-400">Optimistic Updates</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Interactive applications</li>
                <li>• When user experience is priority</li>
                <li>• Forms and data entry</li>
                <li>• When immediate feedback is important</li>
              </ul>
            </div>

            <div className="p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Real-time Updates</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• Chat applications</li>
                <li>• Collaborative tools</li>
                <li>• Live dashboards</li>
                <li>• When multiple users need sync</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
