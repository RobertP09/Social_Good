CREATE DATABASE teacher_helper;

CREATE TABLE IF NOT EXISTS users(
    user_id SERIAL NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_is_Admin BOOLEAN NOT NULL DEFAULT 'false',
    PRIMARY KEY(user_id)
);

CREATE TABLE IF NOT EXISTS profiles(
    profile_id SERIAL NOT NULL,
    profile_name VARCHAR(255) NOT NULL,
    profile_email VARCHAR(255),
    profile_school VARCHAR(255),
    profile_grade VARCHAR(255),
    profile_about TEXT,
    user_id INT REFERENCES users (user_id)
);

CREATE TABLE IF NOT EXISTS wishlists(
    wishlist_id SERIAL NOT NULL,
    wishlist_url TEXT NOT NULL,
    user_id INT REFERENCES users (user_id)
);