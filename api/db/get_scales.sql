SELECT scales.*, array_agg(scales_chords.chord_id) AS chord_ids 
FROM scales 
JOIN scales_chords ON scales.id = scales_chords.scale_id 
GROUP BY scales.id 
ORDER BY scales.name;