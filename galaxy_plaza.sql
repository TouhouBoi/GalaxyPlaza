-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 12, 2020 at 06:20 AM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `galaxy_plaza`
--

-- --------------------------------------------------------

--
-- Table structure for table `audit_logs`
--

CREATE TABLE `audit_logs` (
  `user` int(10) UNSIGNED NOT NULL,
  `community` int(10) UNSIGNED DEFAULT NULL,
  `action` tinyint(1) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `bans`
--

CREATE TABLE `bans` (
  `user` int(10) UNSIGNED NOT NULL,
  `ip` varchar(19) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `banned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `length` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blocks`
--

CREATE TABLE `blocks` (
  `id` int(10) UNSIGNED NOT NULL,
  `source` int(10) UNSIGNED DEFAULT NULL,
  `target` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `communities`
--

CREATE TABLE `communities` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(127) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `description` varchar(1024) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `icon` varchar(1024) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `banner` varchar(1024) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `owner` int(10) UNSIGNED DEFAULT NULL,
  `permissions` tinyint(1) DEFAULT NULL,
  `privacy` tinyint(1) NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `community_admins`
--

CREATE TABLE `community_admins` (
  `user` int(10) UNSIGNED NOT NULL,
  `community` int(10) UNSIGNED NOT NULL,
  `level` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `community_bans`
--

CREATE TABLE `community_bans` (
  `user` int(10) UNSIGNED NOT NULL,
  `ip` varchar(19) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `community` int(10) UNSIGNED NOT NULL,
  `banned_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `length` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `community_favorites`
--

CREATE TABLE `community_favorites` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `community` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `community_members`
--

CREATE TABLE `community_members` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `community` int(10) UNSIGNED NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `conversations`
--

CREATE TABLE `conversations` (
  `id` int(10) UNSIGNED NOT NULL,
  `source` int(10) UNSIGNED DEFAULT NULL,
  `target` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `empathies`
--

CREATE TABLE `empathies` (
  `id` int(10) UNSIGNED NOT NULL,
  `source` int(10) UNSIGNED DEFAULT NULL,
  `target` int(10) UNSIGNED DEFAULT NULL,
  `type` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `id` int(10) UNSIGNED NOT NULL,
  `source` int(10) UNSIGNED NOT NULL,
  `target` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `conversation` int(10) UNSIGNED DEFAULT NULL,
  `feeling` tinyint(1) NOT NULL,
  `body` varchar(2000) DEFAULT NULL,
  `image` varchar(1024) DEFAULT NULL,
  `seen` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `source` int(10) UNSIGNED DEFAULT NULL,
  `target` int(10) UNSIGNED DEFAULT NULL,
  `origin` int(10) UNSIGNED DEFAULT NULL,
  `type` tinyint(1) DEFAULT '0',
  `admin_type` tinyint(1) DEFAULT NULL,
  `admin_reason` int(10) UNSIGNED DEFAULT NULL,
  `merged` int(10) UNSIGNED DEFAULT NULL,
  `seen` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(10) UNSIGNED NOT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `community` int(10) UNSIGNED DEFAULT NULL,
  `feeling` tinyint(1) DEFAULT '0',
  `body` varchar(2000) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `image` varchar(1024) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `yt` varchar(11) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `sensitive_content` tinyint(1) DEFAULT '0',
  `tags` varchar(1183) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `status` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `replies`
--

CREATE TABLE `replies` (
  `id` int(10) UNSIGNED NOT NULL,
  `post` int(10) UNSIGNED DEFAULT NULL,
  `created_by` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `feeling` tinyint(1) DEFAULT '0',
  `body` varchar(2000) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `image` varchar(1024) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `sensitive_content` tinyint(1) DEFAULT '0',
  `status` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reports`
--

CREATE TABLE `reports` (
  `source` int(10) UNSIGNED NOT NULL,
  `target` int(10) UNSIGNED NOT NULL,
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `body` varchar(200) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `community` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tokens`
--

CREATE TABLE `tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `source` int(10) UNSIGNED DEFAULT NULL,
  `value` char(32) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(32) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `nickname` varchar(64) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `email` varchar(254) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `password` binary(60) DEFAULT NULL,
  `avatar` varchar(1024) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `has_mh` tinyint(1) DEFAULT NULL,
  `nnid` varchar(16) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `mh` varchar(13) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `level` tinyint(1) DEFAULT '0',
  `organization` varchar(64) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `profile_comment` varchar(2000) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `favorite_post` int(10) UNSIGNED DEFAULT NULL,
  `yeah_notifications` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` tinyint(1) DEFAULT '0',
  `show_all_posts` tinyint(1) NOT NULL,
  `message_prefs` tinyint(1) NOT NULL,
  `birthday` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `country` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `website` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `ip` varchar(39) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `site_theme` int(11) NOT NULL,
  `custom_bg` text COLLATE utf8mb4_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bans`
--
ALTER TABLE `bans`
  ADD PRIMARY KEY (`user`);

--
-- Indexes for table `blocks`
--
ALTER TABLE `blocks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `communities`
--
ALTER TABLE `communities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `community_admins`
--
ALTER TABLE `community_admins`
  ADD UNIQUE KEY `community_admins_uk_1` (`user`,`community`);

--
-- Indexes for table `community_favorites`
--
ALTER TABLE `community_favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `community_favorites_ibfk_1` (`user`),
  ADD KEY `community_favorites_ibfk_2` (`community`);

--
-- Indexes for table `community_members`
--
ALTER TABLE `community_members`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `conversations`
--
ALTER TABLE `conversations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empathies`
--
ALTER TABLE `empathies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `source` (`source`,`target`,`type`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`source`,`target`),
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_ibfk_1` (`merged`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `replies`
--
ALTER TABLE `replies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reports`
--
ALTER TABLE `reports`
  ADD UNIQUE KEY `reports_uk_1` (`source`,`target`,`type`);

--
-- Indexes for table `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blocks`
--
ALTER TABLE `blocks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `communities`
--
ALTER TABLE `communities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `community_favorites`
--
ALTER TABLE `community_favorites`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `community_members`
--
ALTER TABLE `community_members`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `conversations`
--
ALTER TABLE `conversations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `empathies`
--
ALTER TABLE `empathies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `follows`
--
ALTER TABLE `follows`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `replies`
--
ALTER TABLE `replies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tokens`
--
ALTER TABLE `tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `community_favorites`
--
ALTER TABLE `community_favorites`
  ADD CONSTRAINT `community_favorites_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `community_favorites_ibfk_2` FOREIGN KEY (`community`) REFERENCES `communities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`merged`) REFERENCES `notifications` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
