create table game_school_score
(
    id          int auto_increment
        primary key,
    school_id   int not null,
    total_score int not null
);

create table game_score
(
    id      int auto_increment
        primary key,
    date    date null,
    score   int  not null,
    user_id int  not null
);

create table game_user_score
(
    id          int auto_increment
        primary key,
    total_score int not null,
    user_id     int not null
);

create table interest
(
    category enum ('CULTURE', 'ECONOMY', 'ENTERTAINMENT', 'IT_SCIENCE', 'POLITICS', 'SOCIETY', 'SPORTS', 'WORLD') not null,
    user_id  int                                                                                                  not null,
    primary key (category, user_id)
);

create table school
(
    id      int          not null
        primary key,
    address varchar(255) null,
    name    varchar(255) null
);

create table profile
(
    id           int auto_increment
        primary key,
    birthday     date                    null,
    difficulty   int                     null,
    gender       enum ('FEMALE', 'MALE') null,
    nickname     varchar(255)            null,
    user_id      int                     null,
    school_id    int                     null,
    character_id varchar(255)            null,
    constraint FK2pnawk5nh11qp5jo7ohape4jk
        foreign key (school_id) references school (id)
);

create table user
(
    id          int auto_increment
        primary key,
    created_at  timestamp default CURRENT_TIMESTAMP null,
    updated_at  timestamp                           null,
    email       varchar(255)                        null,
    image       varchar(255)                        null,
    name        varchar(255)                        not null,
    provider    varchar(255)                        not null,
    provider_id varchar(255)                        not null,
    constraint social_login_key
        unique (provider, provider_id)
);


