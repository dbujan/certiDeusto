from lxml import etree
from signxml import XMLSigner, XMLVerifier
from xml.etree.ElementTree import canonicalize
import sys
def xmlSigner(xml, cert, key):
    data_to_sign = xml
    can_xml = canonicalize(data_to_sign)
    contra = "deusto"
    passphrase = contra.encode('utf-8')
    certi = open(cert, 'r').read()
    keyi = open(key,'r').read()
    root = etree.fromstring(can_xml)
    signed_root = XMLSigner(c14n_algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315",signature_algorithm="ecdsa-sha256").sign(root, key=keyi, cert=certi, passphrase=passphrase)
    verified_data = XMLVerifier().verify(signed_root, ca_pem_file='C:/Users/Usuario/ebsi-issuer.crt').signed_xml
    print(etree.tostring(signed_root, pretty_print=True).decode('utf-8'))
    sys.stdout.flush()


xmlSigner(sys.argv[1], sys.argv[2], sys.argv[3])