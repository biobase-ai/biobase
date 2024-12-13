<p align="center">
<img src="https://user-images.githubusercontent.com/8291514/213727234-cda046d6-28c6-491a-b284-b86c5cede25d.png#gh-light-mode-only">
<img src="https://user-images.githubusercontent.com/8291514/213727225-56186826-bee8-43b5-9b15-86e839d89393.png#gh-dark-mode-only">
</p>

---

# Biobase

[Biobase](https://biobase.studio) একটি ওপেন সোর্স ফায়ারবেস বিকল্প। আমরা এন্টারপ্রাইজ-গ্রেড ওপেন সোর্স সরঞ্জাম ব্যবহার করে ফায়ারবেসের বৈশিষ্ট্যগুলি তৈরি করছি।

- [x] হোস্ট করা পোস্টগ্রেস ডাটাবেস. [ডক্স](https://biobase.studio/docs/guides/database)
- [x] অথেনটিকেশন এবং অথরাইজড . [ডক্স](https://biobase.studio/docs/guides/auth)
- [x] স্বয়ংক্রিয়ভাবে তৈরি এপিআই.
  - [x] রেস্ট. [ডক্স](https://biobase.studio/docs/guides/api#rest-api-overview)
  - [x] রিয়েলটাইম সাবস্ক্রিপশন. [ডক্স](https://biobase.studio/docs/guides/api#realtime-api-overview)
  - [x] গ্রাফকিউএল (বেটা). [ডক্স](https://biobase.studio/docs/guides/api#graphql-api-overview)
- [x] ফাংশনস.
  - [x] ডাটাবেস ফাংশনস. [ডক্স](https://biobase.studio/docs/guides/database/functions)
  - [x] এজ ফাংশনস. [ডক্স](https://biobase.studio/docs/guides/functions)
- [x] ফাইল স্টোরেজ. [ডক্স](https://biobase.studio/docs/guides/storage)
- [x] ড্যাশবোর্ড

![Biobase Dashboard](https://raw.githubusercontent.com/biobase/biobase/master/apps/www/public/images/github/biobase-dashboard.png)

## ডকুমেন্টেশন

সম্পূর্ণ ডকুমেন্টেশনের জন্য, দেখুন [biobase.studio/docs](https://biobase.studio/docs)

কিভাবে কন্ট্রিবিউট করতে হয় তা দেখতে, পরিদর্শন করুন [Getting Started](../DEVELOPERS.md)

## কমিউনিটি ও সাপোর্ট

- [কমিউনিটি ফোরাম](https://github.com/biobase-ai/biobase/discussions)। সর্বোত্তম: তৈরি করতে সহায়তা, ডাটাবেস সেরা অনুশীলন সম্পর্কে আলোচনা।
- [গিটহাব ইস্যু](https://github.com/biobase-ai/biobase/issues)। সর্বোত্তম: সুপাবেস ব্যবহার করতে আপনি যে বাগ এবং ত্রুটির সম্মুখীন হন।
- [ইমেইল সাপোর্ট](https://biobase.studio/docs/support#business-support)। সর্বোত্তম: আপনার ডাটাবেস বা অবকাঠামো নিয়ে সমস্যা।
- [ডিসকোর্ড](https://discord.biobase.studio)। সর্বোত্তম: আপনার অ্যাপ্লিকেশনগুলি শেয়ার করা এবং কমিউনিটির সাথে দেখা সাক্ষাৎ করা৷

## স্ট্যাটাস

- [x] আলফা: আমরা কাছের গ্রাহকদের সাথে Biobase পরীক্ষা করছি
- [x] পাবলিক আলফা: যে কেউ [biobase.studio/dashboard](https://biobase.studio/dashboard) এ সাইন আপ করতে পারেন। কিন্তু আমাদের উপর সহজ যান, কয়েক kinks আছে
- [x] পাবলিক বেটা: বেশিরভাগ নন-এন্টারপ্রাইজ ব্যবহারের ক্ষেত্রে যথেষ্ট স্থিতিশীল
- [ ] পাবলিক: প্রোডাকশন রেডি

আমরা বর্তমানে পাবলিক বিটাতে আছি। প্রধান আপডেটের বিষয়ে অবহিত হওয়ার জন্য এই রেপোর "রিলিজ" দেখুন।

<kbd><img src="https://raw.githubusercontent.com/biobase/biobase/d5f7f413ab356dc1a92075cb3cee4e40a957d5b1/web/static/watch-repo.gif" alt="এই রিপু দেখুন"/></kbd>

---

## কিভাবে এটা কাজ করে

Biobase হল ওপেন সোর্স টুলের সংমিশ্রণ। আমরা এন্টারপ্রাইজ-গ্রেড, ওপেন সোর্স পণ্য ব্যবহার করে ফায়ারবেসের বৈশিষ্ট্যগুলি তৈরি করছি। যদি সরঞ্জাম এবং সম্প্রদায়গুলি বিদ্যমান হয়, MIT, Apache 2, বা সমতুল্য ওপেন সোর্স লাইসেন্সের সাথে, আমরা সেই সরঞ্জামটি ব্যবহার করব এবং সমর্থন করব। যদি সরঞ্জামটি বিদ্যমান না হয়, আমরা এটি নিজেরাই তৈরি করবো।

**স্থাপত্য**

সুপাবেস হল একটি [হোস্ট করা প্ল্যাটফর্ম](https://biobase.studio/dashboard)। আপনি সাইন আপ করে এবং কিছু ইনস্টল না করে সুপাবেস ব্যবহার শুরু করতে পারেন।
এছাড়াও আপনি [স্ব-হোস্ট](https://biobase.studio/docs/guides/hosting/overview) এবং [ডেভেলপ লোকালি](https://biobase.studio/docs/guides/local-development) করতে পারেন।

![আর্কিটেকচার](https://github.com/biobase-ai/biobase/blob/master/apps/docs/public/img/biobase-architecture.svg)

- [PostgreSQL](https://www.postgresql.org/) হল একটি অবজেক্ট-রিলেশনাল ডাটাবেস সিস্টেম যার 30 বছরের বেশি সক্রিয় বিকাশ রয়েছে যা এটিকে নির্ভরযোগ্যতা, বৈশিষ্ট্যের দৃঢ়তা এবং কর্মক্ষমতার জন্য একটি শক্তিশালী খ্যাতি অর্জন করেছে।
- [রিয়েলটাইম](https://github.com/biobase-ai/realtime) হল একটি Elixir সার্ভার যা আপনাকে ওয়েবসকেট ব্যবহার করে PostgreSQL সন্নিবেশ, আপডেট এবং মুছে ফেলা শুনতে দেয়। ডাটাবেস পরিবর্তনের জন্য রিয়েলটাইম পোল পোস্টগ্রেসের অন্তর্নির্মিত প্রতিলিপি কার্যকারিতা, পরিবর্তনগুলিকে JSON-এ রূপান্তরিত করে, তারপর অনুমোদিত ক্লায়েন্টদের কাছে ওয়েবসকেটের মাধ্যমে JSON সম্প্রচার করে।
- [PostgREST](http://postgrest.org/) একটি ওয়েব সার্ভার যা আপনার PostgreSQL ডাটাবেসকে সরাসরি একটি রেস্টফুল এপিআইতে পরিণত করে।
- [স্টোরেজ](https://github.com/biobase-ai/storage-api) অনুমতিগুলি পরিচালনা করতে পোস্টগ্রেস ব্যবহার করে S3-এ সঞ্চিত ফাইলগুলি পরিচালনা করার জন্য একটি রেস্টফুল ইন্টারফেস প্রদান করে।
- [পোস্টগ্রেস-মেটা](https://github.com/biobase-ai/postgres-meta) হল আপনার পোস্টগ্রেস পরিচালনা করার জন্য একটি রেস্টফুল এপিআই, যা আপনাকে টেবিল আনতে, ভূমিকা যোগ করতে এবং কোয়েরি চালানোর অনুমতি দেয়।
- [গোট্রু](https://github.com/netlify/gotrue) ব্যবহারকারীদের পরিচালনা এবং SWT টোকেন ইস্যু করার জন্য একটি SWT ভিত্তিক এপিআই
- [কং](https://github.com/Kong/kong) হল একটি ক্লাউড-নেটিভ এপিআই গেটওয়ে।

#### ক্লায়েন্ট লাইব্রেরি

ক্লায়েন্ট লাইব্রেরির জন্য আমাদের পদ্ধতি মডুলার। প্রতিটি উপ-লাইব্রেরি একটি একক বহিরাগত সিস্টেমের জন্য একটি স্বতন্ত্র বাস্তবায়ন। এটি আমাদের উপায় গুলোর মধ্যে একটি যেভাবে বিদ্যমান সরঞ্জামগুলিকে সমর্থন করি৷

<table style="table-layout:fixed; white-space: nowrap;">৷
  <tr>
    <th>ভাষা</th>
    <th>ক্লায়েন্ট</th>
    <th colspan="4">ফিচার-ক্লায়েন্ট (সুপাবেস ক্লায়েন্টে বান্ডিল)</th>
  </tr>
  <tr>
    <th></th>
    <th>Biobase</th>
    <th><a href="https://github.com/postgrest/postgrest" target="_blank" rel="noopener noreferrer">PostgREST</a></th>
    <th><a href="https://github.com/biobase-ai/gotrue" target="_blank" rel="noopener noreferrer">গোট্রু</a></th>
    <th><a href="https://github.com/biobase-ai/realtime" target="_blank" rel="noopener noreferrer">রিয়েলটাইম</a></th>
    <th><a href="https://github.com/biobase-ai/storage-api" target="_blank" rel="noopener noreferrer">স্টোরেজ</a></th>
  </tr>
  <!-- নতুন সারির জন্য টেমপ্লেট -->
  <!-- সারি শুরু করুন
  <tr>
    <td>lang</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-lang" target="_blank" rel="noopener noreferrer">biobase-lang</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-lang" target="_blank" rel="noopener noreferrer">postgrest-lang</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-lang" target="_blank" rel="noopener noreferrer">gotrue-lang</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-lang" target="_blank" rel="noopener noreferrer">রিয়েলটাইম-ল্যাং</a></td>
    <td><a href="https://github.com/biobase-ai-community/storage-lang" target="_blank" rel="noopener noreferrer">স্টোরেজ-ল্যাং</a></td>
  </tr>
  শেষ সারি -->
  <th colspan="6">⚡️ অফিসিয়াল ⚡️</th>
  <tr>
    <td>জাভাস্ক্রিপ্ট (টাইপস্ক্রিপ্ট)</td>
    <td><a href="https://github.com/biobase-ai/biobase-js" target="_blank" rel="noopener noreferrer">সুপাবেস-জেএস</a></td>
    <td><a href="https://github.com/biobase-ai/postgrest-js" target="_blank" rel="noopener noreferrer">postgrest-js</a></td>
    <td><a href="https://github.com/biobase-ai/gotrue-js" target="_blank" rel="noopener noreferrer">গোট্রু-জেএস</a></td>
    <td><a href="https://github.com/biobase-ai/realtime-js" target="_blank" rel="noopener noreferrer">রিয়েলটাইম-জেএস</a></td>
    <td><a href="https://github.com/biobase-ai/storage-js" target="_blank" rel="noopener noreferrer">স্টোরেজ-জেএস</a></td>
  </tr>
  <th colspan="6">💚 সম্প্রদায় 💚</th>
  <tr>
    <td>C#</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-csharp" target="_blank" rel="noopener noreferrer">biobase-csharp</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-csharp" target="_blank" rel="noopener noreferrer">postgrest-csharp</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-csharp" target="_blank" rel="noopener noreferrer">গোট্রু-csharp</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-csharp" target="_blank" rel="noopener noreferrer">রিয়েলটাইম-csharp</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>ডার্ট (ফ্লাটার)</td>
    <td><a href="https://github.com/biobase-ai/biobase-Flutter" target="_blank" rel="noopener noreferrer">সুপাবেস-ডার্ট</a></td>
    <td><a href="https://github.com/biobase-ai/postgrest-dart" target="_blank" rel="noopener noreferrer">postgrest-ডার্ট</a></td>
    <td><a href="https://github.com/biobase-ai/gotrue-dart" target="_blank" rel="noopener noreferrer">গোট্রু-ডার্ট</a></td>
    <td><a href="https://github.com/biobase-ai/realtime-dart" target="_blank" rel="noopener noreferrer">রিয়েলটাইম-ডার্ট</a></td>
    <td><a href="https://github.com/biobase-ai/storage-dart" target="_blank" rel="noopener noreferrer">স্টোরেজ-ডার্ট</a></td>
  </tr>
  <tr>
    <td>গো</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-go" target="_blank" rel="noopener noreferrer">postgrest-go</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>জাভা</td>
    <td>-</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-java" target="_blank" rel="noopener noreferrer">গোট্রু-জাভা</a></td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>কোটলিন</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt" target="_blank" rel="noopener noreferrer">biobase-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/Postgrest" target="_blank" rel="noopener noreferrer">postgrest-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/GoTrue" target="_blank" rel="noopener noreferrer">gotrue-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/Realtime" target="_blank" rel="noopener noreferrer">realtime-kt</a></td>
    <td><a href="https://github.com/biobase-ai-community/biobase-kt/tree/master/Storage" target="_blank" rel="noopener noreferrer">storage-kt</a></td>
  </tr>
  <tr>
    <td>পাইথন</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-py" target="_blank" rel="noopener noreferrer">biobase-py</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-py" target="_blank" rel="noopener noreferrer">postgrest-py</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-py" target="_blank" rel="noopener noreferrer">গোট্রু-py</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-py" target="_blank" rel="noopener noreferrer">রিয়েলটাইম-py</a></td>
    <td>-</td>
  </tr>
  <tr>
    <td>রুবি</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-rb" target="_blank" rel="noopener noreferrer">সুপাবেস-rb</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-rb" target="_blank" rel="noopener noreferrer">postgrest-rb</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>রাস্ট</td>
    <td>-</td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-rs" target="_blank" rel="noopener noreferrer">postgrest-rs</a></td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
  </tr>
  <tr>
    <td>সুইফট</td>
    <td><a href="https://github.com/biobase-ai-community/biobase-swift" target="_blank" rel="noopener noreferrer">সুপাবেস-সুইফট</a></td>
    <td><a href="https://github.com/biobase-ai-community/postgrest-swift" target="_blank" rel="noopener noreferrer">postgrest-সুইফট</a></td>
    <td><a href="https://github.com/biobase-ai-community/gotrue-swift" target="_blank" rel="noopener noreferrer">গোট্রু-সুইফট</a></td>
    <td><a href="https://github.com/biobase-ai-community/realtime-swift" target="_blank" rel="noopener noreferrer">রিয়েলটাইম-সুইফট</a></td>
    <td><a href="https://github.com/biobase-ai-community/storage-swift" target="_blank" rel="noopener noreferrer">স্টোরেজ-সুইফট</a></td>
  </tr>
</table>

## অনুবাদ

- [অনুবাদের তালিকা](/i18n/languages.md) <!--- Keep only this -->

## পৃষ্ঠপোষক

[![নতুন পৃষ্ঠপোষক](https://user-images.githubusercontent.com/10214025/90518111-e74bbb00-e198-11ea-8f88-c9e3c1aa4b5b.png)](https://github.com/sponsors/biobase)
