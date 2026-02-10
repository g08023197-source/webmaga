/*
  # Add LinkedIn Group Metrics

  1. Changes
    - Insert new metric type for LinkedIn Group members
    - Set initial value to 784,705 members
    - Update existing metrics with new follower counts:
      - LinkedIn followers: 8,750
      - Facebook followers: 10,679
      - Discord members: 350,795

  2. Notes
    - This migration adds support for tracking LinkedIn Group membership
    - Updates all platform metrics to reflect current accurate values
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM platform_metrics WHERE metric_type = 'linkedin_group_members'
  ) THEN
    INSERT INTO platform_metrics (metric_type, current_value)
    VALUES ('linkedin_group_members', 784705);
  END IF;
END $$;

UPDATE platform_metrics 
SET current_value = 8750, updated_at = now()
WHERE metric_type = 'linkedin_followers';

UPDATE platform_metrics 
SET current_value = 10679, updated_at = now()
WHERE metric_type = 'facebook_followers';

UPDATE platform_metrics 
SET current_value = 350795, updated_at = now()
WHERE metric_type = 'discord_members';
