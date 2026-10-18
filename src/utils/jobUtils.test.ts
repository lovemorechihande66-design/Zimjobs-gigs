import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterJobs,
  calculateChecklistProgress,
  calculateMonetizationRevenue,
  isDeadlinePassed,
  exportJobsToCSV
} from './jobUtils.ts';
import type { Job, JobFilterState, LaunchChecklistItem, MonetizationInputs } from '../types/job.ts';

const SAMPLE_JOBS: Job[] = [
  {
    id: 'test-1',
    title: 'Shop Assistant',
    employer: 'Downtown Mart',
    location: 'Harare CBD',
    category: 'Part-time',
    pay: 'US$180/month',
    payCurrency: 'USD',
    deadline: '2026-12-31',
    applyLink: 'https://wa.me/263771111111',
    applyType: 'whatsapp',
    applyContactValue: '+263771111111',
    verified: true,
    featured: true,
    postedDate: '2026-10-15',
    description: 'Help customers with groceries and till point.',
    requirements: ['5 O Levels'],
    responsibilities: ['Stock shelves']
  },
  {
    id: 'test-2',
    title: 'Social Media Assistant',
    employer: 'Remote Studio',
    location: 'Remote',
    category: 'Remote',
    pay: 'US$250/month',
    payCurrency: 'USD',
    deadline: '2026-11-10',
    applyLink: 'mailto:info@remote.co.zw',
    applyType: 'email',
    applyContactValue: 'info@remote.co.zw',
    verified: true,
    featured: false,
    postedDate: '2026-10-16',
    description: 'Manage Facebook and TikTok content.',
    requirements: ['Canva experience'],
    responsibilities: ['Create graphics']
  },
  {
    id: 'test-3',
    title: 'Solar Installer',
    employer: 'Green Sun',
    location: 'Bulawayo',
    category: 'Small gigs',
    pay: 'US$30/day',
    payCurrency: 'USD',
    deadline: '2024-01-01', // Expired
    applyLink: 'https://wa.me/263772222222',
    applyType: 'whatsapp',
    applyContactValue: '+263772222222',
    verified: false,
    featured: false,
    postedDate: '2026-10-10',
    description: 'Rooftop solar installation assistant.',
    requirements: ['Basic electrical skills'],
    responsibilities: ['Mount solar panels']
  }
];

test('filterJobs filters correctly by search query', () => {
  const filter: JobFilterState = {
    searchQuery: 'shop',
    category: 'All',
    location: 'All Zimbabwe',
    verifiedOnly: false,
    featuredOnly: false,
    payCurrency: 'All',
    sortBy: 'latest'
  };

  const results = filterJobs(SAMPLE_JOBS, filter);
  assert.equal(results.length, 1);
  assert.equal(results[0].title, 'Shop Assistant');
});

test('filterJobs filters correctly by category', () => {
  const filter: JobFilterState = {
    searchQuery: '',
    category: 'Small gigs',
    location: 'All Zimbabwe',
    verifiedOnly: false,
    featuredOnly: false,
    payCurrency: 'All',
    sortBy: 'latest'
  };

  const results = filterJobs(SAMPLE_JOBS, filter);
  assert.equal(results.length, 1);
  assert.equal(results[0].category, 'Small gigs');
});

test('filterJobs filters correctly by location', () => {
  const filter: JobFilterState = {
    searchQuery: '',
    category: 'All',
    location: 'Bulawayo',
    verifiedOnly: false,
    featuredOnly: false,
    payCurrency: 'All',
    sortBy: 'latest'
  };

  const results = filterJobs(SAMPLE_JOBS, filter);
  assert.equal(results.length, 1);
  assert.equal(results[0].location, 'Bulawayo');
});

test('filterJobs filters verified only', () => {
  const filter: JobFilterState = {
    searchQuery: '',
    category: 'All',
    location: 'All Zimbabwe',
    verifiedOnly: true,
    featuredOnly: false,
    payCurrency: 'All',
    sortBy: 'latest'
  };

  const results = filterJobs(SAMPLE_JOBS, filter);
  assert.equal(results.length, 2);
  assert.ok(results.every((j) => j.verified));
});

test('calculateChecklistProgress calculates accurately', () => {
  const items: LaunchChecklistItem[] = [
    { id: '1', label: 'Item 1', description: '', completed: true },
    { id: '2', label: 'Item 2', description: '', completed: false },
    { id: '3', label: 'Item 3', description: '', completed: true },
    { id: '4', label: 'Item 4', description: '', completed: false }
  ];

  const progress = calculateChecklistProgress(items);
  assert.equal(progress.completedCount, 2);
  assert.equal(progress.totalCount, 4);
  assert.equal(progress.percentage, 50);
  assert.equal(progress.isAllDone, false);

  const allDone = calculateChecklistProgress(items.map((i) => ({ ...i, completed: true })));
  assert.equal(allDone.percentage, 100);
  assert.equal(allDone.isAllDone, true);
});

test('calculateMonetizationRevenue calculates accurately matching guide table', () => {
  const scenario1: MonetizationInputs = {
    featuredCount: 5,
    featuredPrice: 3,
    promoCount: 0,
    promoPrice: 0,
    recruitmentCount: 0,
    recruitmentPrice: 0
  };
  assert.equal(calculateMonetizationRevenue(scenario1).totalRevenue, 15);

  const scenario2: MonetizationInputs = {
    featuredCount: 10,
    featuredPrice: 5,
    promoCount: 2,
    promoPrice: 10,
    recruitmentCount: 1,
    recruitmentPrice: 30
  };
  const result2 = calculateMonetizationRevenue(scenario2);
  assert.equal(result2.featuredRevenue, 50);
  assert.equal(result2.promoRevenue, 20);
  assert.equal(result2.recruitmentRevenue, 30);
  assert.equal(result2.totalRevenue, 100);
});

test('isDeadlinePassed identifies past deadlines', () => {
  assert.equal(isDeadlinePassed('2020-01-01'), true);
  assert.equal(isDeadlinePassed('2099-12-31'), false);
  assert.equal(isDeadlinePassed('Open until filled'), false);
});

test('exportJobsToCSV formats correct CSV with headers matching Google Sheets schema', () => {
  const csv = exportJobsToCSV(SAMPLE_JOBS);
  assert.ok(csv.startsWith('Job Title,Employer,Location,Category,Pay,Deadline,Apply Link,Verified'));
  assert.ok(csv.includes('"Shop Assistant","Downtown Mart","Harare CBD","Part-time"'));
});
