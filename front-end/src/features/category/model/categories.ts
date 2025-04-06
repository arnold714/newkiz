import { Category } from './types';

export const categories: Category[] = [
  {
    id: 'it_science',
    name: 'IT/과학',
    subCategories: [
      { id: 'ai_robotics', name: '인공지능과 로봇', iconName: 'ai' },
      { id: 'digital_internet', name: '디지털 기술과 인터넷', iconName: 'digital' },
      { id: 'space_natural', name: '우주와 자연 과학', iconName: 'universe' },
      { id: 'general_it_science', name: 'IT/과학 일반', iconName: 'scientific-knowledge' },
    ],
  },
  {
    id: 'politics',
    name: '정치',
    subCategories: [
      { id: 'government_policy', name: '정부와 정책', iconName: 'law' },
      { id: 'parliament_law', name: '국회와 법률', iconName: 'assembly' },
      { id: 'election_party', name: '선거와 정당', iconName: 'vote' },
    ],
  },
  {
    id: 'economy',
    name: '경제',
    subCategories: [
      { id: 'finance_investment', name: '금융과 투자', iconName: 'economy' },
      { id: 'consumer_price', name: '소비와 물가', iconName: 'global-economy' },
    ],
  },
  {
    id: 'society',
    name: '사회',
    subCategories: [
      { id: 'education_school', name: '교육과 학교', iconName: 'school' },
      { id: 'environment_disaster', name: '환경과 재해', iconName: 'environment' },
      { id: 'safety_health', name: '안전과 건강', iconName: 'health' },
      { id: 'general_society', name: '사회 일반', iconName: 'society' },
    ],
  },
  {
    id: 'culture',
    name: '생활/문화',
    subCategories: [
      { id: 'culture_art', name: '문화와 예술', iconName: 'cultureandart' },
      { id: 'leisure_life', name: '여가와 생활', iconName: 'everyday' },
    ],
  },
  {
    id: 'world',
    name: '세계',
    subCategories: [
      { id: 'global_economy', name: '국제 사회와 글로벌 경제', iconName: 'overseas' },
      { id: 'world_culture', name: '세계 문화와 생활', iconName: 'worldwide-culture' },
    ],
  },
  {
    id: 'sports',
    name: '스포츠',
    subCategories: [
      { id: 'soccer', name: '축구', iconName: 'soccer' },
      { id: 'baseball', name: '야구', iconName: 'baseball' },
      { id: 'basketball', name: '농구', iconName: 'basketball' },
      { id: 'volleyball', name: '배구', iconName: 'volleyball' },
      { id: 'e-sports', name: '올림픽과 국제대회', iconName: 'olympic' },
      { id: 'general_sports', name: '스포츠 일반', iconName: 'e-sports' },
    ],
  },
];
