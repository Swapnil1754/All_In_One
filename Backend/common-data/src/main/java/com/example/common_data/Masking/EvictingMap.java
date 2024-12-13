package com.example.common_data.Masking;

import java.util.LinkedHashMap;
import java.util.Map;

public class EvictingMap<K, V> extends LinkedHashMap<K, V> {
    private final int maxSize;


    public EvictingMap(int maxSize) {
        super(maxSize, 0.75f, true);
        this.maxSize = maxSize;
    }
    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return size() > maxSize;
    }
}
