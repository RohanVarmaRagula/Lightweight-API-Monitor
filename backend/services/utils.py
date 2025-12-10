def _percentile_index(n: int, p: float) -> int:
    if n <= 0:
        return 0
    res = int(n * p) - 1
    res = max(res, 0)
    res = min(res, n - 1)
    return res    

