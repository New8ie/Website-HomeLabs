CREATE TABLE `PostLikes` (
	`rowid` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`slug` text NOT NULL,
	`likes` integer DEFAULT 0,
	`ip_address` text
);
