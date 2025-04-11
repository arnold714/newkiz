create table user
(
    id          int auto_increment        primary key,
    created_at  TIMESTAMP   null  DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP   null  DEFAULT CURRENT_TIMESTAMP,
    email       varchar(255) null,
    image       varchar(255) null,
    name        varchar(255) not null,
    provider    varchar(255) not null,
    provider_id varchar(255) not null,
    constraint social_login_key
        unique (provider, provider_id)
);

create table profile
(
    id          int auto_increment        primary key,
    created_at  timestamp default CURRENT_TIMESTAMP,
    updated_at  timestamp default CURRENT_TIMESTAMP,
    user_id       int                               not null,
    nickname VARCHAR(50),
    birthday    date,
    school      varchar(255),
    gender      VARCHAR(10) CHECK (gender IN ('MALE', 'FEMALE')),

    CONSTRAINT fk_profile_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE

);