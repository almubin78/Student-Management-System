import React from 'react';
// import Register from './OutlatePages/Register/Register';
import StudentStudy from './StudentStudy';
// import { HiArchiveBox } from "react-icons/hi2";
// import { IconName } from "react-icons";

const HomePage = () => {
    return (
        <>
        
        <StudentStudy/>
        <div className='px-10 py-5'>
            <p className='bg-green-200 my-2 p-2 rounded'>
                দুনিয়াতে <span className="text-md text-pink-800 font-bold">মেধাবী ছাত্র/ছাত্রী</span> বলতে কিছু নাই। পরিশ্রমী Students দিনে কয়েক ঘন্টার রুটিন অনুসরন করে যে দক্ষতা এবং জ্ঞান অর্জন করে, আইলসা Students সেটাকেই মেধা  বলে।
            </p>
            <p className='bg-green-200 my-2 p-2 rounded'>
                <span className="text-md text-pink-800 font-bold">এই কথাগুলা বিশ্বাস না হলে</span> তোমার আশেপাশের ট্যালেন্টেড একটা Friend কে বলো, <hr />
                <p className="px-5">"তোর তো ডিব্বা ভর্তি ট্যালেন্ট। তাই আজকের পর থেকে ক্লাসের বাইরে তুই বই ধরবি না, কোন প্রাকটিস রিভিশন দিবি না। বাসায় কোন স্টাডি করবি না।
                    দেখি ট্যালেন্ট এর ঠেলায় তুই ক্লাসে ফার্স্ট, সেকেন্ড হতে পারস কিনা?"</p>
                <hr />
                <span className="text-md text-pink-800 font-bold">তখন বুঝতে পারবে সে শুধু মগজের ঘিলু দিয়ে ট্যালেন্টেড হয় নাই।</span>

                বরং প্রতিদিনের রুটিন অনুসরনের পুরস্কার হিসেবে ট্যালেন্টেড হইছে।
            </p>
            <p className='bg-green-200 my-2 p-2 rounded'>
                এজন্যই আশেপাশে অনেক  <span className="text-md text-pink-800 font-bold">ট্যালেন্টেড Student</span> দেখবে যারা- <hr />
                ওভার কনফিডেন্স এর ঢেকুরে ফোকাস হারিয়ে হার্ডওয়ার্ক করা কমায় দিছে।
                আর দুই-তিন মাসের মধ্যে তার ট্যালেন্ট <span className="text-md text-pink-800 font-bold">গায়েবুল হাওয়া </span>

                হয়ে গেছে।
            </p>
            
            <div class="container mx-auto p-6">
                
                <div class="overflow-x-auto">
                    <table class="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr class="bg-indigo-600 text-white">
                                
                                <th class="border border-gray-300 px-4 py-2 text-left">ট্যালেন্টেড Students</th>
                                <th class="border border-gray-300 px-4 py-2 text-left">সাধারণ Students</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr class="bg-gray-50">
                               
                                <td class="border border-gray-300 px-4 py-2">
                                    নিয়মিত পড়ালেখা, প্র্যাকটিস, রিভিশন করে এবং শেখে।
                                </td>
                                <td class="border border-gray-300 px-4 py-2">
                                    আমরা শর্টকার্ট খুঁজে , চালাকি করে, কপি করে , এবং টিচারকে বোকা বানানোর চেষ্টা করি।
                                </td>
                            </tr>

                            <tr class="bg-white">
                                
                                <td class="border border-gray-300 px-4 py-2">
                                    তারা রুটিন মেনে কাজ করে এবং নিয়মিত এফোর্ট দেয়।
                                </td>
                                <td class="border border-gray-300 px-4 py-2">
                                    শুধুমাত্র পরীক্ষার ডেডলাইন এলে কাজ শুরু করি, পরীক্ষার সময় ভাবি 'এইবার পরীক্ষাটা শেষ হোক' এবং পরীক্ষার পরে আবার আগের অবস্থায় ফিরে যাই।
                                </td>
                            </tr>

                            <tr class="bg-gray-50">
                                
                                <td class="border border-gray-300 px-4 py-2">
                                    তারা কাজকে গুরুত্ব দেয় এবং প্রয়োজনীয় রিলাক্স বা ব্রেকের জন্য আলাদাভাবে নির্দিষ্ট সময় দেয়।
                                </td>
                                <td class="border border-gray-300 px-4 py-2">
                                    আমরা ফেসবুক, খেলা, মুভি, ভাইরাল ট্রেন্ড, এবং বিভিন্ন অ্যাপে সময় নষ্ট করি।
                                </td>
                            </tr>

                            <tr class="bg-white">
                                
                                <td class="border border-gray-300 px-4 py-2">
                                    তারা দ্রুত সমস্যার সমাধান করে এবং টাস্ক সম্পন্ন করে।
                                </td>
                                <td class="border border-gray-300 px-4 py-2">
                                    আমরা অজুহাত দিয়ে কাজ ফেলে রাখি, যেমন: অসুস্থতা, ইন্টারনেট সমস্যা, ইত্যাদি।
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        {/* <Register/> */}
        </div>
        </>
        
    );
};

export default HomePage;