CREATE TABLE `karyawan` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(100),
	`handphone` varchar(30),
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted` boolean DEFAULT false,
	CONSTRAINT `karyawan_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `paket` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(100),
	`deskripsi` text,
	`harga` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted` boolean DEFAULT false,
	CONSTRAINT `paket_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transaksi` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama_customer` varchar(100),
	`no_hp` varchar(30),
	`paket_id` int NOT NULL,
	`karyawan_id` int NOT NULL,
	`status` enum('booking','proses','selesai','batal') NOT NULL DEFAULT 'proses',
	`total` int NOT NULL,
	`jadwal_booking` timestamp,
	`waktu_transaksi` timestamp DEFAULT (now()),
	CONSTRAINT `transaksi_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nama` varchar(100),
	`username` varchar(100),
	`password` varchar(256),
	`role` enum('admin','operator') DEFAULT 'operator',
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp DEFAULT (now()),
	`deleted` boolean DEFAULT false,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_paket_id_paket_id_fk` FOREIGN KEY (`paket_id`) REFERENCES `paket`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `transaksi` ADD CONSTRAINT `transaksi_karyawan_id_karyawan_id_fk` FOREIGN KEY (`karyawan_id`) REFERENCES `karyawan`(`id`) ON DELETE no action ON UPDATE no action;