export const brandPaths = [
  { fill: '#7055E8', d: 'M380 432H398C414 432 426 444 426 460V536C426 612 469 666 543 666H600C617 666 630 679 630 696V746C630 784 662 814 698 814H942C999 814 1045 860 1045 917S999 1019 942 1019H416C302 1019 209 926 209 812V603C209 509 286 432 380 432Z' },
  { fill: '#CDEB76', d: 'M564 294C623 294 670 341 670 400V430C670 483 712 528 765 540C783 544 794 554 794 572V611C794 626 782 638 767 638H565C506 638 458 590 458 531V400C458 341 505 294 564 294Z' },
  { fill: '#FF765E', d: 'M739 235H870C967 235 1045 313 1045 410V765C1045 781 1033 793 1017 793H944C882 793 832 743 832 681V558C832 539 820 528 801 524C750 514 713 470 713 419V261C713 247 725 235 739 235Z' },
];

/** The three-piece ReddyStack symbol. */
export function BrandSymbol({ className, pieceClasses }: { className?: string; pieceClasses?: [string, string, string] }) {
  return (
    <svg className={className} viewBox="125 125 1000 1000" aria-hidden="true" focusable="false">
      {brandPaths.map((p, i) => (
        <path key={p.fill} fill={p.fill} d={p.d} className={pieceClasses?.[i]} data-piece={i} />
      ))}
    </svg>
  );
}
