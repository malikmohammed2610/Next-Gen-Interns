USE next_gen_interns;

INSERT INTO plans (name, price, currency, features, is_active, sort_order)
VALUES
('Gold', 0.00, 'INR', 'Core platform access and application tracking', 1, 1),
('Diamond', 499.00, 'INR', 'Expanded career tools and application insights', 1, 2),
('Platinum', 999.00, 'INR', 'Premium career support and progress analytics', 1, 3)
ON DUPLICATE KEY UPDATE
  price = VALUES(price),
  currency = VALUES(currency),
  features = VALUES(features),
  is_active = VALUES(is_active),
  sort_order = VALUES(sort_order);

-- No sample internship is marked verified. Add only opportunities reviewed by an administrator.
-- Create the first administrator through a secure one-time setup script in the database step.
