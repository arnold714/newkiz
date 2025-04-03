export interface HotTopicArticle {
    id: string;
    title: string;
    link: string;
    published: string;
    category: string;
    article: string;
    img: string;
    views: number;
}

export interface News {
    title: string;
    content: string;
    imageUrl: string;
    category: '스포츠' | '정치' | '경제' | '사회' | 'IT/과학' | '세계' | '연예' | '생활/문화'
}

export type NewsCategory = '전체' | '스포츠' | '정치' | '경제' | '사회' | 'IT/과학' | '세계' | '연예' | '생활/문화'

