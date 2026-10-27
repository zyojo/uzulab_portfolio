const pad = (month: number) => String(month).padStart(2, '0')

/** 作業期間を "2022.10 ~ 2023.10" / "2023.06 ~ 11" / "2019.03" の形にする */
export const formatWorkDuration = (start?: string | Date, end?: string | Date) => {
  if (!start && !end) return ''
  const s = new Date(start ?? end!)
  const e = new Date(end ?? start!)
  const [sy, sm, ey, em] = [s.getFullYear(), pad(s.getMonth() + 1), e.getFullYear(), pad(e.getMonth() + 1)]
  if (sy === ey && sm === em) return `${sy}.${sm}`
  return sy === ey ? `${sy}.${sm} ~ ${em}` : `${sy}.${sm} ~ ${ey}.${em}`
}
