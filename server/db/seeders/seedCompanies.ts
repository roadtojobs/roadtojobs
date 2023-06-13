import { db } from '@db';
import { fakerEN_US as faker } from '@faker-js/faker';

export default async function seedCompanies() {
  const total = 50;
  const promises = [];

  console.log(`Creating ${total} companies...`);
  for (let i = 1; i <= total; i++) {
    promises.push(
      db.create('company', {
        name: getCompanyName()[i - 1],
        description: faker.commerce.productDescription(),
        homepage: faker.internet.url({ protocol: 'https' }),
      })
    );
  }

  await Promise.all(promises);
  console.log(`Created ${total} companies.`);
}

function getCompanyName(): string[] {
  return [
    'Apple',
    'Amazon',
    'Microsoft',
    'Alphabet',
    'Facebook',
    'Tencent',
    'Samsung',
    'Intel',
    'IBM',
    'Oracle',
    'Cisco',
    'Nvidia',
    'Adobe',
    'Salesforce',
    'SAP',
    'Tesla',
    'Netflix',
    'PayPal',
    'T-Mobile',
    'Verizon',
    'AT&T',
    'Sony',
    'Baidu',
    'HP',
    'Dell',
    'Qualcomm',
    'Huawei',
    'Twitter',
    'Uber',
    'Airbnb',
    'Dropbox',
    'Slack',
    'Snap',
    'WeChat',
    'Square',
    'LinkedIn',
    'VMware',
    'Zoom',
    'Xiaomi',
    'TikTok',
    'Nintendo',
    'Spotify',
    'Zillow',
    'Workday',
    'Pinterest',
    'Lyft',
    'Rakuten',
    'Intuit',
    'Nokia',
    'BlackBerry',
  ];
}
