import {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import './demo.css';

const defaults = {
    departure: 'ICN', destination: 'NRT', departureDate: '2027-05-12',
    returnDate: '2027-05-16', maxPrice: 230000, passengers: 2,
};
const labels = {ICN: '인천 (ICN)', NRT: '도쿄 나리타 (NRT)', KIX: '오사카 간사이 (KIX)'};
const money = value => `${new Intl.NumberFormat('ko-KR').format(value)}원`;
const endpoint = 'http://127.0.0.1:8081/api/demo/alerts';

export default function Demo() {
    const [params, setParams] = useSearchParams();
    const id = params.get('alert');
    const [form, setForm] = useState(defaults);
    const [alert, setAlert] = useState(null);
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (!id) return;
        const controller = new AbortController();
        fetch(`${endpoint}/${encodeURIComponent(id)}`, {signal: controller.signal})
            .then(response => {
                if (!response.ok) throw new Error('저장된 조건을 불러오지 못했습니다. 새 조건을 등록해 주세요.');
                return response.json();
            })
            .then(saved => { setAlert(saved); setForm(saved.condition); setError(''); })
            .catch(error => { if (error.name !== 'AbortError') setError(error.message); });
        return () => controller.abort();
    }, [id]);

    const field = (name, numeric = false) => ({
        value: form[name],
        onChange: event => {
            const value = event.target.value;
            setForm(previous => ({...previous, [name]: numeric && value ? Number(value) : value}));
        },
    });

    async function submit(event) {
        event.preventDefault();
        setBusy(true);
        setError('');
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form),
            });
            if (!response.ok) throw new Error('조건을 저장하지 못했습니다. 입력값을 확인해 주세요.');
            const saved = await response.json();
            setAlert(saved);
            setParams({alert: saved.id}, {replace: true});
        } catch (error) {
            setError(error.message);
        } finally {
            setBusy(false);
        }
    }

    const best = alert?.matches[0];
    return (
        <main className="fm-demo">
            <header>
                <span className="fm-kicker">FLIGHTMORE / PORTFOLIO DEMO</span>
                <h1>항공권 모아</h1>
                <p>여행 조건을 저장하면 샘플 항공권을 조회하고 알림을 미리 보여줍니다.</p>
            </header>
            <div className="fm-grid">
                <section className="fm-card">
                    <h2>01. 알림 조건</h2>
                    <form className="fm-form" onSubmit={submit}>
                        <label>출발지<select {...field('departure')}><option value="ICN">인천 (ICN)</option></select></label>
                        <label>도착지<select {...field('destination')}>
                            <option value="NRT">도쿄 나리타 (NRT)</option>
                            <option value="KIX">오사카 간사이 (KIX)</option>
                        </select></label>
                        <label>출발일<input type="date" required {...field('departureDate')} /></label>
                        <label>귀국일<input type="date" min={form.departureDate} required {...field('returnDate')} /></label>
                        <label>1인 상한가 (원)<input type="number" min="1" max="2147483647" required {...field('maxPrice', true)} /></label>
                        <label>인원<input type="number" min="1" max="9" required {...field('passengers', true)} /></label>
                        <button type="submit" disabled={busy}>{busy ? '저장 중…' : '조건 저장 및 항공권 찾기'}</button>
                    </form>
                    {error && <p role="alert" className="fm-error">{error}</p>}
                </section>
                <section className="fm-card" aria-live="polite">
                    <h2>02. 매칭 결과</h2>
                    {!alert && <p>기본 조건을 저장해 인천 → 도쿄 왕복 항공편을 찾아보세요.</p>}
                    {alert && <>
                        <p className="fm-tag">조건 #{alert.id} 저장 · {alert.matches.length}건 매칭</p>
                        {alert.matches.length === 0 && <p>조건에 맞는 샘플 항공권이 없습니다.</p>}
                        <ul className="fm-flights">{alert.matches.map(flight => <li key={flight.code}>
                            <span><strong>{flight.code}</strong> <small>{flight.airline} · 잔여 {flight.seats}석</small></span>
                            <strong>{money(flight.pricePerPerson)}</strong>
                        </li>)}</ul>
                    </>}
                    <div className="fm-preview">
                        <h2>03. 알림 미리보기</h2>
                        {best ? <p><strong>{labels[alert.condition.departure]} → {labels[alert.condition.destination]}</strong>
                            <br />{alert.condition.departureDate} ~ {alert.condition.returnDate}
                            <br />{best.code} · 1인 {money(best.pricePerPerson)} · {alert.condition.passengers}명
                        </p> : <p>매칭된 항공편이 있으면 최저가 항공편이 여기에 표시됩니다.</p>}
                        <small>샘플 항공권 · 알림 미리보기</small>
                    </div>
                </section>
            </div>
        </main>
    );
}
