SELECT
    bcs.id,
	CASE
        WHEN ca.LedgerNum IS NUll
        OR ca.LedgerNum = '' THEN left(ca.GUID, 8)
        ELSE ca.LedgerNum
    END AS 'Case Number',
	c.RecordNum AS 'RecordNum',
	p.ID AS 'PersonID',
	bcs.IsManual,
	bcs.IsOverride,
    p.FirstName,
    p.MiddleName,
    p.LastName,
    p.DateOfBirth,
    p.DateOfDeath,
    bcs.ScanDateTime,
    bcs.RecordedDateTime,
    bcs.StaffID,
    bcs.ResourceID,
    bc.BarCode,
    bcr.Name,
    bcr.FixedResource
FROM BarCodeScan bcs
LEFT JOIN BarCodes bc ON bcs.TableID = bc.TableID
LEFT JOIN BarCodeResources bcr ON bcs.ResourceID = bcr.id
LEFT JOIN Person p ON bcs.TableID = p.ID
LEFT JOIN FuneralHomeStaff s ON bcs.StaffID = s.ID
LEFT JOIN Client c ON c.PersonID = p.ID
LEFT JOIN ClientAdmin ca ON ca.RecordNum = c.RecordNum
ORDER BY  p.ID DESC, bcs.ScanDateTime ASC
;